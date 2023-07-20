import { About } from "../pages/About"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Todo } from "../pages/Todo"
import { Contact } from "../pages/Contact"
import { SignUp } from "../pages/SignUp"

export const nav = [
     { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
     { path:     "/about",    name: "About",       element: <About />,      isMenu: true,     isPrivate: false  },
     { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
     { path:     "/todo",  name: "Todo",     element: <Todo />,    isMenu: true,     isPrivate: true  },
     { path:     "/account",  name: "Account",     element: <Account />,    isMenu: true,     isPrivate: true  },
     { path:     "/contact",  name: "Contact",     element: <Contact />,    isMenu: true,     isPrivate: false  },
     { path:     "/signup",  name: "SignUp",     element: <SignUp />,    isMenu: false,     isPrivate: false  },
]