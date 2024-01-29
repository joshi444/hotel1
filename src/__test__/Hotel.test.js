import  {render,screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import  Hotels from '../Pages/Hotels'
import { Provider } from 'react-redux';
import store from '../Store';

describe("testing hotel component ",() =>{
    test("renders ",async () =>{
        render(
            <Provider store={store}>
            <BrowserRouter>
              <Hotels/>
        </BrowserRouter>
        </Provider>
        )
        const li = await screen.findAllByRole('listitem');
        expect(li).not.toHaveLength(0);
    })
}) 