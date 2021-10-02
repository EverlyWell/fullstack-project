/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import StyledComponents from './LoginFormStyled';
import Spinner from "react-spinners/ClipLoader";


const {
    Container,
    FormContainer,
    UsernameInput,
    TitleText,
    TitleContainer,
    InputContainer,
    LoginButton,
    ButtonContainer,
    CatEmoji,
    PasswordInput,
} = StyledComponents;
  

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
    };

    return (
        <Container>
            <FormContainer>
                <TitleContainer>
                    <TitleText>Hello, What's your username? (for cats!)</TitleText>
                </TitleContainer>
                <InputContainer>
                    <UsernameInput 
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserName(e.target.value)}
                        placeholder='username' value={userName} 
                    />
                </InputContainer>
                <InputContainer>
                    <PasswordInput 
                        type='password'
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                        placeholder='password' value={password} 
                    />
                </InputContainer>
                <ButtonContainer>
                    <LoginButton onClick={handleLogin}>
                        {isLoading ? <Spinner loading={isLoading} color='#FFFFFF' /> : <CatEmoji>😻 </CatEmoji> }
                    </LoginButton>
                </ButtonContainer>
            </FormContainer>
        </Container>
    );
};

export default LoginForm;
