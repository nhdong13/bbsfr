import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import * as React from "react"

export function getAuthToken() {
  try {
    return localStorage.getItem("token")
  } catch {
    return null
  }
}

export function setAuthToken(token) {
  localStorage.setItem("token", token)
}

export function removeAuthToken() {
  localStorage.removeItem("token")
}

export const invalidTokenLinkWithTokenHandlerComponent = (component) => {
  // tslint:disable-next-line:no-empty
  let tokenExpirationCallback = () => {}

  const tokenExpirationHandler = (callback) => {
    tokenExpirationCallback = callback
  }
  const extendedComponent = (props) => {
    return React.createElement(component, {
      ...props,
      tokenExpirationHandler,
    })
  }
  const link = onError((error) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      tokenExpirationCallback()
    }
  })
  return { component: extendedComponent, link }
}

export const authLink = setContext((_, context) => {
  const authToken = getAuthToken()
  if (authToken) {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: authToken ? `JWT ${authToken}` : null,
      },
    }
  } else {
    return context
  }
})
