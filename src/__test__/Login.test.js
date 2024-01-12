import  {render,screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Login from "../Pages/Login"

describe("testing login component ",() =>{
    test("renders login with one button",async () =>{
        render(
            <BrowserRouter>
        <Login/>
        </BrowserRouter>
        )
        const btn = await screen.findByText("Login", { selector: "button" });
        expect(btn)
    })
}) 