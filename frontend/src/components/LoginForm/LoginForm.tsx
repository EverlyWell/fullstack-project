/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import StyledComponents from './LoginFormStyled';
import Spinner from "react-spinners/ClipLoader";
import { LogInOrCreateUserName } from '../../api/api';


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
  
interface Props {
    setCredentials: (credentials : any) => void
}

const LoginForm = (props : Props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const credentials  = await LogInOrCreateUserName(username, password);
        setLoading(false);
        props.setCredentials(credentials);
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
                        placeholder='username' value={username} 
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
