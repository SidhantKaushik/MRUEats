import React from 'react'
import '../styles/Signup.css'

const Signup = (props) => {
    return ( 
        <div class="main-container"> 
            <div class="box">

                <h3>SIGN UP</h3>

                <form>
                    <div>
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" />
                    </div>
                    <div>
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" />
                    </div>
                    <div>
                        <input id="signup-button" type="submit" value="SIGN UP" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;