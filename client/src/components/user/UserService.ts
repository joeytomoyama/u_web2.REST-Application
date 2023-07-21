import * as IDS from "../../ids"
import { UserType } from "../../types"

export function createUser(): UserType {
  const userId =
    (
      document.getElementById(
        IDS.CreateUserComponentEditUserID,
      ) as HTMLInputElement
    )?.value ?? ""
  const firstName =
    (
      document.getElementById(
        IDS.CreateUserComponentEditFirstName,
      ) as HTMLInputElement
    )?.value ?? ""
  const lastName =
    (
      document.getElementById(
        IDS.CreateUserComponentEditLastName,
      ) as HTMLInputElement
    )?.value ?? ""
  const password =
    (
      document.getElementById(
        IDS.CreateUserComponentEditPassword,
      ) as HTMLInputElement
    )?.value ?? ""
  const isAdministrator =
    (
      document.getElementById(
        IDS.CreateUserComponentEditIsAdministrator,
      ) as HTMLInputElement
    )?.checked ?? false

  const createdUser: UserType = {
    userID: userId,
    firstName: firstName,
    lastName: lastName,
    password: password,
    isAdministrator: isAdministrator,
  }

  return createdUser
}

export function editUser(): UserType {
  const firstName =
    (
      document.getElementById(
        IDS.EditUserComponentEditFirstName,
      ) as HTMLInputElement
    )?.value ?? ""
  const lastName =
    (
      document.getElementById(
        IDS.EditUserComponentEditLastName,
      ) as HTMLInputElement
    )?.value ?? ""
  const password =
    (
      document.getElementById(
        IDS.EditUserComponentEditPassword,
      ) as HTMLInputElement
    )?.value ?? ""
  const isAdministrator =
    (
      document.getElementById(
        IDS.EditUserComponentEditIsAdministrator,
      ) as HTMLInputElement
    )?.checked ?? false

  const editedUser: UserType = {}
  if (firstName) editedUser.firstName = firstName
  if (lastName) editedUser.lastName = lastName
  if (password) editedUser.password = password
  if (isAdministrator) editedUser.isAdministrator = isAdministrator

  return editedUser
}
