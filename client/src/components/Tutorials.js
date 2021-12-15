/* This is "user manual" for what features can be found from the webpage*/ 

function Tutorials() {
    return (
        <div>
            <h2> Here are the tutorials for usage of this web page</h2>
            <h4> Non-registered user can</h4>
                <ul>
                    <li> read other users' code snippets </li>
                    <li> read other users' comments on code snippets </li>
                    <li> see votes on code snippets</li>
                    <li> change language (Finnish or English)</li>
                </ul>
            <h4> When user is registered and logged in, they can in addition</h4>
            <ul>
                <li> post their own code snippets </li>
                <li> comment on other users' code snippets </li>
                <li> vote code snippets and comments (like or dislike once) </li>
                <li> edit your own code snippets and comments </li>
            </ul>
            <h4> Notes for registering and logging in! </h4>
            <ul>
                <li> If there happens some errors when registering or logging in (e.g. your email already exists, password is not strong enough or wrong credentials are written, these error messages are shown in the console but not in the webpage!</li>
                <li> You know that your registering/logging in has been succesful, when: </li>
                <ul>
                    <li> After registering you are redirected to the login-page</li>
                    <li> After logging in the navigation bar shows options "logout" and "my posts" instead "register" and "login"</li>
                </ul>
            </ul>
            <h4> Thank you for using this web page! :) </h4>
        
        </div>
    )
}

export default Tutorials
