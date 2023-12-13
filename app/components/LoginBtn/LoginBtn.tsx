import { Button, useEditable } from "@chakra-ui/react";
import Image from "next/image";
import GoogleIcon from "../../styles/Icons/BsGoogle.svg";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

function getBtn(login: () => void, logout: () => void) {
	let btn;
	if (document && document.cookie.includes("token")) {
		btn = (
			<Button
				size={{ md: "md", sm: "xs" }}
				fontFamily={"arial"}
				borderRadius={16}
				margin={"auto"}
				paddingX={4}
				paddingY={2}
				rightIcon={<Image alt="to" src={GoogleIcon} width={16} />}
				onClick={logout}
			>
				Logout
			</Button>
		);
	} else {
		btn = (
			<Button
				size={{ md: "md", sm: "xs" }}
				fontFamily={"arial"}
				borderRadius={16}
				margin={"auto"}
				paddingX={4}
				paddingY={2}
				rightIcon={<Image alt="to" src={GoogleIcon} width={16} />}
				onClick={login}
			>
				Login
			</Button>
		);
	}

	return btn;
}
export default function LoginBtn() {
	const [oneTapDisabled, setOneTapDisabled] = useState(true);

	const login = () => {
		setOneTapDisabled(false);
	};

	const logout = () => {
		setOneTapDisabled(true);
		document.cookie =
			"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setBtn(getBtn(login, logout));
	};
	let [btn, setBtn] = useState(getBtn(login, logout));
	useGoogleOneTapLogin({
		onSuccess: (credentialResponse) => {
			document.cookie = `token=${credentialResponse.credential}`;
			console.log("Login Success");
			setBtn(getBtn(login, logout));
		},
		onError: () => {
			console.log("Login Failed");
		},
		disabled: oneTapDisabled,
	});
	useEffect(() => {
		setBtn(getBtn(login, logout));
	}, []);
	return <div>{btn}</div>;
}
