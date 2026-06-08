import { useState } from "react";
import { supabase } from "../lib/supabase";

function PhoneLogin() {

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const sendOTP = async () => {

        const { error } =
            await supabase.auth.signInWithOtp({
                phone,
            });

        if (error) {
            alert(error.message);
        } else {
            alert("OTP Sent");
            setShowOtp(true);
        }
    };

    const verifyOTP = async () => {

        const { error } =
            await supabase.auth.verifyOtp({
                phone,
                token: otp,
                type: "sms",
            });

        if (error) {
            alert(error.message);
        } else {
            alert("Login Successful");
        }
    };

    return (
        <div>

            <input
                type="text"
                placeholder="+919876543210"
                value={phone}
                onChange={(e) =>
                    setPhone(e.target.value)
                }
            />

            <button onClick={sendOTP}>
                Send OTP
            </button>

            {showOtp && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value)
                        }
                    />

                    <button onClick={verifyOTP}>
                        Verify OTP
                    </button>
                </>
            )}

        </div>
    );
}

export default PhoneLogin;