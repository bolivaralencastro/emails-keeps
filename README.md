# 📧 Emails Keeps - Email Template Editor

Sistema de gerenciamento de templates de email com design system customizável, desenvolvido para a plataforma Konquest.

## 🎨 Características

- **Design System Personalizável**: Altere cor primária e logo em tempo real
- **Arquitetura JSON-driven**: 27 templates com conteúdo estruturado em JSON
- **Preview em Tempo Real**: Visualize mudanças instantaneamente
- **Modo Comparação**: Compare templates originais vs refatorados lado a lado
- **Responsivo**: Preview desktop e mobile
- **Material Design Icons**: Ícones modernos e consistentes
- **Export/Import**: Salve e carregue configurações de design system

## 🚀 Tecnologias

- **React 18** + **Vite**
- **Lucide Icons** (UI do app)
- **Material Symbols** (ícones dos emails)
- **TinyColor2** (geração de paletas de cores)
- **CSS Modules** (estilização)

## 📂 Estrutura do Projeto

```
emails-keeps/
├── email-template-editor/          # App React principal
│   ├── public/
│   │   ├── templates/              # Templates HTML originais (27)
│   │   ├── templates-refatorados/  # Templates HTML refatorados (legado)
│   │   ├── email-data/             # JSONs com conteúdo dos emails (27)
│   │   └── icons/                  # Ícones PNG para emails
│   ├── src/
│   │   ├── components/
│   │   │   ├── DesignSystemEditor.jsx    # Editor de cores/logo
│   │   │   ├── TemplateList.jsx          # Lista de templates
│   │   │   ├── TemplatePreview.jsx       # Preview com iframe/React
│   │   │   └── EmailTemplate.jsx         # Componente de email
│   │   ├── utils/
│   │   │   ├── emailRenderer.js          # Renderiza JSON → HTML (legado)
│   │   │   ├── tokenInjector.js          # Aplica design tokens
│   │   │   ├── templateList.js           # Lista de templates
│   │   │   └── templateVariables.js      # Variáveis dinâmicas
│   │   ├── App.jsx                       # Componente principal
│   │   └── main.jsx                      # Entry point
│   └── package.json
├── templates/                      # Templates originais extraídos do CSV
├── DESIGN_SYSTEM.md               # Documentação do design system
├── GUIA_IMPLEMENTACAO.md          # Guia de implementação
└── RESUMO_EXECUTIVO.md            # Resumo executivo do projeto
```

## 🎯 Arquitetura

### Templates Refatorados (Modernos)
- **JSON → React Components**: Conteúdo estruturado renderizado diretamente como JSX
- **Sem iframe**: Renderização nativa no DOM
- **Material Symbols**: Ícones da web
- **Design consistente**: Todos seguem o mesmo padrão visual

### Templates Originais (Legado)
- **HTML estático**: Preserva templates originais da plataforma
- **Iframe**: Renderização isolada
- **PNG Icons**: Compatível com email clients
- **Design variável**: Mantém estrutura original

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/emails-keeps.git
cd emails-keeps/email-template-editor

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📖 Como Usar

1. **Abra o app**: http://localhost:5174
2. **Selecione um template** na lista à direita
3. **Escolha a versão**: Original ou Refatorado
4. **Customize o design system**:
   - Altere a cor primária
   - Adicione URL do logo
   - Export/Import configurações
5. **Compare versões**: Ative o modo comparação
6. **Export**: Baixe as configurações em JSON

## 🎨 Design System

O design system segue princípios modernos de UI/UX:

- **8-Point Grid System**: Espaçamentos múltiplos de 8px
- **Cor Primária**: Personalizável com 10 variações automáticas
- **Cores Fixas**: 
  - Background: `#f3f5f8` (cinza claro)
  - Container: `#ffffff` (branco)
  - Texto: `#000000` (preto)
- **Tipografia**: System fonts (`-apple-system, Segoe UI, Roboto`)
- **Icons**: Material Symbols Outlined

## 📧 Templates Disponíveis

27 tipos de email categorizados:

### Analytics (1)
- Relatório gerado com sucesso

### Konquest (22)
- Convites e inscrições
- Notificações de missões
- Atualizações de trilhas
- Gestão de cursos
- Avisos administrativos

### SmartZap (3)
- Convites WhatsApp
- Erros de cadastro

### MyAccount (1)
- Reenvio de convite

## 🔧 Desenvolvimento

### Adicionar Novo Template

1. Crie o JSON em `public/email-data/`:
```json
{
  "id": "novo_template",
  "name": "Nome do Template",
  "category": "konquest",
  "header": {
    "icon": "mail",
    "title": "Título do Email"
  },
  "content": {
    "intro": "Texto introdutório",
    "cta": {
      "text": "Botão de Ação",
      "url": "{{actionUrl}}"
    }
  }
}
```

2. Adicione à lista em `src/utils/templateList.js`

3. O template será renderizado automaticamente!

### Modificar Estilos

- **Estilos globais do email**: `src/components/EmailTemplate.css`
- **Estilos do app**: `src/index.css`
- **Componentes específicos**: `*.css` correspondente

## 📦 Build e Deploy

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

O build gera arquivos otimizados em `dist/` prontos para deploy.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Keeps - Florianópolis, SC, Brasil.

## 👥 Créditos

**Desenvolvido por Keeps**  
Florianópolis | SC | Brasil

---

💜 Feito com carinho para melhorar a experiência de comunicação da plataforma Konquest
