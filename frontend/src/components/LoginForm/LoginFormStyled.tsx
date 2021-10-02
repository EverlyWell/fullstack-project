
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    height: 300px;
    background-color: #282c34;
    border-color: white;
    border-radius: 20px;
    border-style: solid;
    border-width: 2px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TitleText = styled.div`
    font-size: 24px;
    color: white;
`;

const InputContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UsernameInput = styled.input`
    height: 30px;
    width: 180px;
`;

const LoginButton = styled.div`
    display: flex;    
    background-color: gray;
    border-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    border-width: 2px;
    justify-content: center;
    align-items: center;
    border-style: solid;
    width: 60px;
    height: 40px;
`;

const ButtonContainer = styled.div`
    cursor: pointer;
`;

const CatEmoji = styled.div`
    display: flex; 
    align-items: center;
    align-text: center;
    justify-content: center;
    font-size: 28px;
`;

const PasswordInput = styled.input`
    height: 30px;
    width: 180px;
`;


const StyledComponents = {
    Container,
    TitleContainer,
    TitleText,
    InputContainer,
    UsernameInput,
    LoginButton,
    ButtonContainer,
    PasswordInput,
    CatEmoji,
    FormContainer,
};;

export default StyledComponents;
