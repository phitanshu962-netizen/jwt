import { InputType, Field, ObjectType } from "type-graphql"
import { User } from "../entity/User"

@InputType()
export class RegisterInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  age: number
}

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string

  @Field()
  user: User
}

@ObjectType()
export class AuthResponse {
  @Field()
  success: boolean

  @Field({ nullable: true })
  message?: string

  @Field({ nullable: true })
  accessToken?: string
}
