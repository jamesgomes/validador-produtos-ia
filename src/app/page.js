'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Header,
  ExamplesWrapper,
  ExampleButton,
  Input,
  TextArea,
  Button,
  Preview,
  ResultCard,
  StatusBadge,
  RiskBarWrapper,
  RiskLabel,
  RiskBar,
  RiskFill,
  TextAnalysis,
  InfoButtonStyled,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Alert,
} from './styles';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Lista de exemplos
  const exemplos = [
    {
      nome: 'Produto neutro ✅',
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_723399-MLU75919880611_042024-O.webp',
      title: 'Kit de lápis coloridos',
      description: 'Kit de lápis coloridos ideal para artistas e estudantes.',
    },
    {
      nome: 'Produto violento ⚠️',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqw0h_zImDzbAerVu5svHXK_uVn8udMZNQOg&s',
      title: 'Faca para corte preciso.',
      description: 'Faca para desossar carnes com lâmina afiada e cabo ergonômico.',
    },
    {
      nome: 'Produto sexual ⚠️',
      imageUrl:
        'https://acdn-us.mitiendanube.com/stores/001/136/813/products/378e7a3a03b210e857ce37d21210c91d-158dc7133715a4dd1217054979167937-1024-1024.jpeg',
      title: 'Conjunto de lingerie',
      description: 'Lingerie sensual em renda para ocasiões especiais.',
    },
    {
      nome: 'Produto político ✅',
      imageUrl: 'https://img.elo7.com.br/product/600x380/2959792/camiseta-lula-livre-camiseta-personalizada.jpg',
      title: 'Camiseta do Lula Livre',
      description: 'Camiseta com mensagem Lula Livre, ideal para ativistas políticos.',
    },
  ];

  const handleSelectExample = (example) => {
    setImageUrl(example.imageUrl);
    setTitle(example.title);
    setDescription(example.description);
    setAlert(null);
    setResult(null);
  };

  useEffect(() => {
    if (imageUrl.startsWith('http')) {
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl('');
    }
  }, [imageUrl]);

  const handleValidate = async () => {
    setLoading(true);
    setAlert(null);
    setResult(null);

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({ type: response.status === 429 ? 'warning' : 'error', message: data.error });
      } else {
        setResult(data);
        // Aguarda o React renderizar o resultado antes de rolar
        setTimeout(() => {
          const resultadoSection = document.getElementById('alert');
          if (resultadoSection) {
            resultadoSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        setAlert({
          type: data.status === 'approved' ? 'success' : 'warning',
          message: data.status === 'approved' ? '✅ Produto aprovado' : '⚠️ Produto precisa de revisão',
        });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao conectar com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const getColor = (level) => {
    switch (level) {
      case 'VERY_UNLIKELY':
      case 'UNLIKELY':
        return '#28a745';
      case 'POSSIBLE':
        return '#ffc107';
      case 'LIKELY':
      case 'VERY_LIKELY':
        return '#dc3545';
      default:
        return '#ccc';
    }
  };

  return (
    <Container>
      <Header>Analisador Inteligente de Produtos</Header>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#6e6e73', marginBottom: '24px' }}>
        Valide imagem, título e descrição usando Inteligência Artificial.
      </p>

      <InfoButtonStyled onClick={() => setShowModal(true)}>ℹ️ Como funciona?</InfoButtonStyled>

      <ExamplesWrapper>
        {exemplos.map((item, index) => (
          <ExampleButton key={index} onClick={() => handleSelectExample(item)}>
            {item.nome}
          </ExampleButton>
        ))}
      </ExamplesWrapper>

      <Input placeholder="Cole a URL da imagem" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

      {previewUrl && (
        <Preview>
          <img src={previewUrl} alt="Preview" onError={() => setPreviewUrl('')} />
        </Preview>
      )}

      <Input placeholder="Digite o título do produto" value={title} onChange={(e) => setTitle(e.target.value)} />

      <TextArea
        placeholder="Digite a descrição do produto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={handleValidate} disabled={loading || !imageUrl || !title || !description}>
        {loading ? '⏳ Processando...' : 'Validar Produto'}
      </Button>

      {alert && (
        <Alert id="alert" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }} type={alert.type}>
          {alert.message}
        </Alert>
      )}

      {result && (
        <ResultCard id="resultado">
          <h3>
            📋 Resultado:{' '}
            <StatusBadge status={result.status}>{result.status === 'approved' ? '✅ Aprovado' : '⚠️ Revisão'}</StatusBadge>
          </h3>
          <p>
            <strong>Motivos:</strong> {result.reasons.length > 0 ? result.reasons.join(', ') : 'Nenhum'}
          </p>

          <h4>🖼 Análise da Imagem:</h4>
          {['adult', 'violence', 'racy'].map((key) => (
            <RiskBarWrapper key={key}>
              <RiskLabel>{key === 'adult' ? '🔞 Adult' : key === 'violence' ? '🩸 Violence' : '🔥 Racy'}</RiskLabel>
              <RiskBar>
                <RiskFill level={result.imageModeration[key]} color={getColor(result.imageModeration[key])} />
              </RiskBar>
              <small>{result.imageModeration[key]}</small>
            </RiskBarWrapper>
          ))}

          <h4>📑 Análise de Texto:</h4>
          <TextAnalysis>
            {Object.entries(result.textModeration).map(([key, value]) => {
              const traducoes = {
                sexual: 'Conteúdo sexual',
                violence: 'Violência',
                hate: 'Discurso de ódio',
                harassment: 'Assédio',
                'hate/threatening': 'Ódio (ameaças)',
                'violence/graphic': 'Violência gráfica',
                'self-harm': 'Autolesão',
                'sexual/minors': 'Conteúdo sexual envolvendo menores',
              };
              const label = traducoes[key] || key;
              return (
                <li key={key} style={{ color: value ? 'red' : 'green' }}>
                  {value ? '⚠️' : '✅'} {label}: {value ? 'Detectado' : 'Seguro'}
                </li>
              );
            })}
          </TextAnalysis>
        </ResultCard>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <h2>🔍 Como funciona a validação?</h2>
            <p>Nosso sistema analisa título, descrição e imagem do produto para identificar possíveis conteúdos sensíveis.</p>
            <h3>🛠 Tecnologias Utilizadas:</h3>
            <ul>
              <li>🤖 OpenAI Moderation: analisa texto para detectar conteúdo sexual, violência, ódio, assédio e autolesão.</li>
              <li>🖼 Google Vision SafeSearch: analisa imagens para detectar nudez, violência e conteúdo sugestivo.</li>
            </ul>
            <h3>✅ Critérios:</h3>
            <ul>
              <li>⚠️ Qualquer alerta → Produto em revisão.</li>
              <li>✅ Sem alertas → Produto aprovado automaticamente.</li>
            </ul>
            <h3>💰 Custos:</h3>
            <ul>
              <li>🤖 OpenAI: $0.0005 / 1.000 tokens</li>
              <li>🖼 Google Vision: $1.50 / 1.000 imagens</li>
            </ul>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
