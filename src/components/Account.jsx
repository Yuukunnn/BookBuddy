/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useNavigate } from "react-router-dom";


const Account =({userData}) =>{

const handleReturnBook = () =>{

}

    return (
        <div>
            <p>First Name: {userData.firstname}</p>
            <p>Last Name: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
            <p>Books: {userData?.books.length > 0 && userData?.books.map((book)=>(
                <div>
                   <h5>{book.title}</h5>
                   <button onClick={handleReturnBook} >Return</button>
                </div>
            ))}</p>
        </div>
    )
}

export default Account;