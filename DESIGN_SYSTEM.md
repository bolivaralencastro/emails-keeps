# Design System - Konquest Email Templates

## 📐 Fundamentos

### Princípios
1. **Whitelabel-First**: Cores e logos 100% customizáveis por empresa
2. **Consistência Visual**: Todos os emails seguem o mesmo padrão
3. **Mobile-First**: Responsivo em todos os dispositivos
4. **Compatibilidade**: Funciona em Outlook, Gmail, Apple Mail, etc

---

## 🎨 Paleta de Cores

### Cores Primárias (Customizáveis)
```css
--brand-primary: #6366f1       /* Cor principal da marca */
--brand-secondary: #8b5cf6     /* Cor secundária */
--brand-accent: #10b981        /* Cor de destaque */
```

### Cores do Sistema (Fixas)
```css
/* Fundos */
--bg-primary: #ffffff          /* Fundo principal (branco) */
--bg-secondary: #f3f5f8        /* Fundo alternativo (cinza claro) */
--bg-tertiary: #ebebeb         /* Boxes/Cards */

/* Textos */
--text-primary: #111827        /* Texto principal (preto) */
--text-secondary: #6b7280      /* Texto secundário (cinza) */
--text-tertiary: #9ca3af       /* Texto terciário (cinza claro) */
--text-white: #ffffff          /* Texto em fundos escuros */

/* Borders */
--border-light: #e5e7eb        /* Bordas suaves */
--border-default: #d1d5db      /* Bordas padrão */
--border-strong: #9ca3af       /* Bordas marcadas */

/* Feedback */
--success: #10b981             /* Verde - sucesso */
--warning: #f59e0b             /* Amarelo - aviso */
--error: #ef4444               /* Vermelho - erro */
--info: #3b82f6                /* Azul - informação */
```

---

## 📝 Tipografia

### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                'Helvetica Neue', Arial, sans-serif;
--font-secondary: Georgia, 'Times New Roman', Times, serif;
--font-mono: 'Courier New', Courier, monospace;
```

### Escala Tipográfica
| Nome | Tamanho | Peso | Line Height | Uso |
|------|---------|------|-------------|-----|
| **display** | 36px | 700 | 1.2 | Títulos principais (H1) |
| **heading-1** | 26px | 700 | 1.3 | Subtítulos importantes (H2) |
| **heading-2** | 20px | 600 | 1.4 | Seções (H3) |
| **heading-3** | 18px | 600 | 1.4 | Subsseções (H4) |
| **body-large** | 18px | 400 | 1.6 | Texto destaque |
| **body** | 16px | 400 | 1.6 | Texto padrão (corpo) |
| **body-small** | 14px | 400 | 1.5 | Texto secundário |
| **caption** | 12px | 400 | 1.4 | Rodapé, labels |

---

## 📏 Espaçamento

### Escala de Spacing (8-Point Grid System)
```css
--space-0: 0px
--space-1: 8px      /* Micro */
--space-2: 16px     /* Pequeno */
--space-3: 24px     /* Médio */
--space-4: 32px     /* Grande */
--space-5: 40px     /* Muito grande */
--space-6: 48px     /* Extra grande */
--space-7: 64px     /* Máximo */
```

### Uso Recomendado
- **Padding interno de conteúdo**: 32px (desktop) / 16px (mobile)
- **Espaçamento entre seções**: 40px
- **Espaçamento entre parágrafos**: 16px
- **Espaçamento entre elementos**: 24px
- **Margens de cards**: 24px
- **Espaçamento de botões**: 16px (vertical) / 32px (horizontal)

---

## 📦 Layout

### Container Principal
```html
<!-- Largura máxima: 600px (padrão email) -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0">
        <!-- Conteúdo aqui -->
      </table>
    </td>
  </tr>
</table>
```

### Dimensões
- **Largura máxima**: 600px (desktop)
- **Largura mobile**: 100% (responsivo)
- **Padding lateral**: 32px (desktop) / 16px (mobile)
- **Espaçamento vertical entre seções**: 40px

---

## 🎯 Componentes

### 1. Header (Cabeçalho)
```
┌────────────────────────────────┐
│                                │
│    [LOGO]                      │ ← Altura: 64-80px
│                                │
│    Background: var(--brand-primary) ou branco
│    Padding: 32px
│                                │
└────────────────────────────────┘
```

**Variações:**
- **Simples**: Apenas logo centralizada
- **Com título**: Logo + título do email
- **Colorida**: Background na cor da marca

---

### 2. Hero Section (Seção Principal)
```
┌────────────────────────────────┐
│                                │
│    [ÍCONE/IMAGEM]              │
│                                │
│    Título Principal            │ ← H1 (36px)
│    Subtítulo descritivo        │ ← Body (16px)
│                                │
│    Padding: 40px 32px
│    Background: branco ou imagem
│                                │
└────────────────────────────────┘
```

---

### 3. Botão (CTA - Call to Action)
```css
/* Primário */
background: var(--brand-primary)
color: #ffffff
padding: 16px 32px
border-radius: 8px
font-size: 16px
font-weight: 600
text-decoration: none

/* Secundário */
background: transparent
border: 2px solid var(--brand-primary)
color: var(--brand-primary)
padding: 14px 30px
```

**Tamanhos:**
- **Grande**: 16px, padding 16px 32px
- **Médio**: 14px, padding 12px 24px
- **Pequeno**: 12px, padding 8px 16px

---

### 4. Card de Conteúdo
```
┌────────────────────────────────┐
│                                │
│    Título da Seção             │ ← H2 (26px)
│                                │
│    Conteúdo do card com        │ ← Body (16px)
│    informações relevantes      │
│                                │
│    Background: var(--bg-tertiary)
│    Border-radius: 8px
│    Padding: 32px
│    Margin: 24px 0
│                                │
└────────────────────────────────┘
```

---

### 5. Lista de Itens
```html
<table>
  <tr>
    <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
      • Item 1
    </td>
  </tr>
  <tr>
    <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
      • Item 2
    </td>
  </tr>
</table>
```

---

### 6. Footer (Rodapé)
```
┌────────────────────────────────┐
│                                │
│    Precisa de ajuda?           │ ← Caption (12px)
│                                │
│    [Botão WhatsApp] [Email]    │ ← Botões secundários
│                                │
│    Rua Exemplo, 123            │ ← Endereço
│    São Paulo, SP               │
│                                │
│    © 2026 [Nome da Empresa]    │
│    Desenvolvido por Keeps      │
│                                │
│    Background: #f3f5f8
│    Padding: 40px 32px
│    Text-align: center
│                                │
└────────────────────────────────┘
```

---

## 🎭 Tokens Whitelabel

### Variáveis Customizáveis por Empresa
```css
{
  "brandPrimary": "#6366f1",
  "brandSecondary": "#8b5cf6",
  "brandAccent": "#10b981",
  "logoUrl": "https://empresa.com/logo.png",
  "companyName": "Nome da Empresa",
  "companyAddress": "Rua Exemplo, 123",
  "companyPhone": "(11) 1234-5678",
  "companyEmail": "contato@empresa.com",
  "whatsappNumber": "5511987654321"
}
```

---

## 📱 Responsividade

### Breakpoint Mobile
```css
@media only screen and (max-width: 600px) {
  /* Container full-width */
  .container { width: 100% !important; }
  
  /* Reduzir paddings (mantém múltiplos de 8) */
  .padding-desktop { padding: 16px !important; }
  
  /* Empilhar colunas */
  .column { display: block !important; width: 100% !important; }
  
  /* Ajustar tamanhos de fonte */
  .display { font-size: 28px !important; }
  .heading-1 { font-size: 22px !important; }
}
```

---

## ✅ Checklist de Implementação

### Para cada novo email:
- [ ] Usa estrutura de tabelas (compatibilidade)
- [ ] Container de 600px max-width
- [ ] Header com logo customizável
- [ ] Tipografia seguindo escala definida
- [ ] Cores usando variáveis do design system
- [ ] Botões com estilo padrão
- [ ] Footer com informações da empresa
- [ ] Responsivo para mobile
- [ ] Testado em múltiplos clientes de email

---

## 🔧 Ferramentas

### Teste de Email
- **Litmus**: Teste em +90 clientes de email
- **Email on Acid**: Preview e testes
- **Mailtrap**: Teste em desenvolvimento

### Validação
- **W3C Validator**: HTML válido
- **Can I Email**: Suporte de CSS em emails

---

## 📚 Referências

- [Foundation for Emails](https://get.foundation/emails.html)
- [MJML](https://mjml.io/)
- [Really Good Emails](https://reallygoodemails.com/)
- [Email Design Best Practices](https://www.campaignmonitor.com/best-practices/)
