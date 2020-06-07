import React from 'react';

// Todo componente deve começar com letra maiuscula pra não chocar com as tags HTML

interface HeaderProps {
    title: string; //se a prop for obrigatória usa title?:string
}

const Header: React.FC<HeaderProps> = (props) => { //FC => Function Component(tipo genérico que pode receber "parâmetros")
    return (
        <header>
            <h1>{ props.title }</h1>
        </header>
    )
}

export default Header;