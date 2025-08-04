import styled from "styled-components";

// Container principal responsivo
export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  color: #1d1d1f;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

// Cabeçalho
export const Header = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1d1d1f;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;


// Botão "Como funciona?"
export const InfoButtonStyled = styled.button`
  display: block;
  margin: 0 auto 24px auto;
  padding: 12px 20px;
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  color: #1d1d1f;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #e5e5e7;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

// Alertas
export const Alert = styled.div`
  margin-bottom: 20px;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  background: ${({ type }) =>
    type === "success"
      ? "#e6f4ea"
      : type === "warning"
      ? "#fff4e5"
      : "#fdecea"};
  color: ${({ type }) =>
    type === "success"
      ? "#18794e"
      : type === "warning"
      ? "#92400e"
      : "#b91c1c"};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Wrapper para os exemplos
export const ExamplesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Botões de exemplo
export const ExampleButton = styled.button`
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 15px;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #e5e5e7;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 14px;
    padding: 12px;
  }
`;

// Inputs e TextArea responsivos
export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 18px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  font-size: 16px;
  color: #1d1d1f;
  background: #fafafa;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid #0071e3;
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  margin-bottom: 18px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  font-size: 16px;
  color: #1d1d1f;
  background: #fafafa;
  resize: none;
  height: 100px;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid #0071e3;
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
    height: 80px;
  }
`;

// Botão principal responsivo
export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #0071e3;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #005bb5;
  }
  &:disabled {
    background: #d2d2d7;
    color: #8e8e93;
    cursor: not-allowed;
  }


  @media (max-width: 480px) {
    font-size: 16px;
    padding: 14px;
  }
`;

// Preview da imagem responsivo
export const Preview = styled.div`
  text-align: center;
  margin-bottom: 24px;
  img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 16px;
    border: 1px solid #d2d2d7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    object-fit: cover;
  }

  @media (max-width: 480px) {
    img {
      max-height: 220px;
    }
  }
`;

// Card de resultado responsivo
export const ResultCard = styled.div`
  margin-top: 32px;
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  h3 {
    font-size: 22px;
    margin-bottom: 14px;
    text-align: center;
  }
  h4 {
    font-size: 18px;
    margin-top: 20px;
    color: #1d1d1f;
  }

  @media (max-width: 480px) {
    padding: 18px;
    h3 {
      font-size: 18px;
    }
    h4 {
      font-size: 16px;
    }
  }
`;

// Badge status
export const StatusBadge = styled.span`
  background: ${({ status }) => (status === "approved" ? "#34c759" : "#ffcc00")};
  color: #fff;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 14px;
  margin-left: 10px;
  font-size: 14px;
`;

// Barras de risco
export const RiskBarWrapper = styled.div`
  margin-bottom: 14px;
`;

export const RiskLabel = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
`;

export const RiskBar = styled.div`
  width: 100%;
  height: 12px;
  background: #e5e5ea;
  border-radius: 6px;
  overflow: hidden;
`;

export const RiskFill = styled.div`
  height: 100%;
  width: ${({ level }) =>
    level === "VERY_LIKELY"
      ? "100%"
      : level === "LIKELY"
      ? "80%"
      : level === "POSSIBLE"
      ? "60%"
      : level === "UNLIKELY"
      ? "30%"
      : "10%"};
  background: ${({ color }) => color};
  transition: width 0.4s ease;
`;

// Lista da análise de texto
export const TextAnalysis = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 12px;
  li {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

// Modal responsivo
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(29, 29, 31, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 90%;
  max-width: 600px;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 18px;
    margin-top: 18px;
  }
  p, li {
    font-size: 16px;
    line-height: 1.5;
  }
  ul {
    margin-top: 8px;
    padding-left: 18px;
  }

  @media (max-width: 480px) {
    padding: 18px;
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 16px;
    }
    p, li {
      font-size: 14px;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: none;
  font-size: 24px;
  color: #1d1d1f;
  cursor: pointer;
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  color: #86868b;
  font-size: 14px;
  font-weight: 400;
  padding: 16px 0;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
