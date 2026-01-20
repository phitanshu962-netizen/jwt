import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql"
import { User } from "../entity/User"
import { RegisterInput, LoginInput, AuthResponse, LoginResponse } from "../types/AuthTypes"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken } from "../auth"
import { sendRefreshToken } from "../sendRefreshToken"
import { MyContext } from "../MyContext"
require("dotenv").config()

@Resolver()
export class UserResolver {

  @Query(() => String)
  hello() {
    return "Hello World!"
  }

  @Mutation(() => AuthResponse)
  async register(@Arg("input") input: RegisterInput, @Ctx() { res }: MyContext): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: input.email } })
    if (existingUser) {
      return {
        success: false,
        message: "User already exists"
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 12)

    // Create user
    const user = User.create({
      ...input,
      password: hashedPassword
    })
    await user.save()

    // Send refresh token
    sendRefreshToken(res, createRefreshToken(user))

    return {
      success: true,
      message: "User registered successfully",
      accessToken: createAccessToken(user)
    }
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInput, @Ctx() { res }: MyContext): Promise<LoginResponse> {
    // Find user
    const user = await User.findOne({ where: { email: input.email } })
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Check password
    const valid = await bcrypt.compare(input.password, user.password)
    if (!valid) {
      throw new Error("Invalid credentials")
    }

    // Send refresh token
    sendRefreshToken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
      user
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    const authorization = req.headers["authorization"]
    if (!authorization) {
      return false
    }

    try {
      const token = authorization.split(" ")[1]
      const payload: any = require("jsonwebtoken").verify(token, process.env.ACCESS_TOKEN_SECRET!)
      const user = await User.findOne({ where: { id: payload.userId } })
      if (user) {
        user.tokenVersion += 1
        await user.save()
      }
    } catch (err) {
      console.log(err)
      return false
    }

    sendRefreshToken(res, "")
    return true
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    const authorization = req.headers["authorization"]
    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(" ")[1]
      const payload: any = require("jsonwebtoken").verify(token, process.env.ACCESS_TOKEN_SECRET!)
      const user = await User.findOne({ where: { id: payload.userId } })
      return user || null
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
