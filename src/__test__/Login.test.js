import  {render,screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Login from "../Pages/Login"
import { Provider } from 'react-redux';
import store from '../Store/index';


describe("testing login component ",() =>{
    test("renders login with one button",async () =>{
        render(
            <Provider store={store}>
            <BrowserRouter>
        <Login/>
        </BrowserRouter>
        </Provider>
        )
        const btn = await screen.findByText("Login", { selector: "button" });
        expect(btn)
    })
}) 