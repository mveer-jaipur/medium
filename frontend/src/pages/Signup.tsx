import { Quote } from "../components/Quote"
import { SignupComponent } from "../components/SignupComponent"

export const Signup = () => {
    return (
        <div className="grid grid-cols-2">
            <SignupComponent />
            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>
    )
}