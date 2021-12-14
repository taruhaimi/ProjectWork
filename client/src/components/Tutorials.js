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
            </ul>
            <h4> Thank you for using this web page! :) </h4>
        
        </div>
    )
}

export default Tutorials
