# Guia de Implementação - Design System Konquest

## 🚀 Como Aplicar o Novo Padrão

### 1. Template Base
Use o arquivo `template-base-padronizado.html` como ponto de partida para **todos** os novos emails.

### 2. Variáveis Whitelabel
Substitua estas variáveis para cada empresa:

```javascript
{
  // Cores da Marca
  "brandPrimary": "#6366f1",      // Cor principal
  "brandSecondary": "#8b5cf6",    // Cor secundária
  "brandAccent": "#10b981",       // Cor de destaque
  
  // Logo e Branding
  "logoUrl": "https://...",
  "companyName": "Nome da Empresa",
  
  // Contato
  "companyEmail": "contato@empresa.com",
  "whatsappNumber": "5511987654321",
  "companyAddress": "Rua Exemplo, 123",
  "companyCity": "São Paulo, SP - Brasil",
  "currentYear": "2026",
  
  // Conteúdo do Email
  "emailTitle": "Bem-vindo ao Konquest!",
  "emailSubtitle": "Sua jornada de aprendizado começa agora",
  "heroIcon": "🎯",
  "userName": "João Silva",
  "mainMessage": "Estamos felizes em tê-lo conosco...",
  "cardTitle": "Próximos Passos",
  "cardContent": "Complete seu perfil e comece...",
  "ctaText": "Acessar Plataforma",
  "ctaUrl": "https://konquest.empresa.com",
  "additionalInfo": "Este email foi enviado automaticamente..."
}
```

---

## 📋 Migração dos Emails Existentes

### Prioridade Alta (Emails Transacionais)
1. ✅ Konquest Invite
2. ✅ Konquest User Enrolled
3. ✅ Konquest Onboarding
4. ✅ Analytics New Report

### Prioridade Média (Notificações)
5. Konquest Mission Enrollment Expiring
6. Konquest Live Enrollment Accepted
7. Konquest Presential Enrollment Accepted

### Prioridade Baixa (Outros)
8. Demais templates

---

## 🎨 Componentes Reutilizáveis

### Header Simples
```html
<tr>
  <td class="brand-primary" align="center" style="padding: 32px;">
    <img src="{{logoUrl}}" alt="{{companyName}}" width="150">
  </td>
</tr>
```

### Header com Título
```html
<tr>
  <td class="brand-primary px-32 py-32" align="center" style="padding: 32px;">
    <img src="{{logoUrl}}" alt="{{companyName}}" width="120" style="margin-bottom: 16px;">
    <h2 class="heading-2" style="color: #ffffff; margin: 0;">
      {{headerTitle}}
    </h2>
  </td>
</tr>
```

### Botão Primário
```html
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0;">
  <tr>
    <td align="center">
      <a href="{{url}}" class="btn btn-primary" style="padding: 16px 32px;">
        {{buttonText}}
      </a>
    </td>
  </tr>
</table>
```

### Botão Secundário
```html
<a href="{{url}}" class="btn btn-secondary">
  {{buttonText}}
</a>
```

### Card de Informação
```html
<table class="card" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
  <tr>
    <td style="padding: 32px; background-color: #ebebeb; border-radius: 8px;">
      <h3 class="heading-2 text-primary" style="margin: 0 0 16px 0;">
        {{title}}
      </h3>
      <p class="body text-secondary" style="margin: 0;">
        {{content}}
      </p>
    </td>
  </tr>
</table>
```

### Lista com Ícones
```html
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding: 16px 0; border-bottom: 1px solid #d1d5db;">
      <span class="body-small text-secondary">✓ {{item1}}</span>
    </td>
  </tr>
  <tr>
    <td style="padding: 16px 0; border-bottom: 1px solid #d1d5db;">
      <span class="body-small text-secondary">✓ {{item2}}</span>
    </td>
  </tr>
  <tr>
    <td style="padding: 16px 0;">
      <span class="body-small text-secondary">✓ {{item3}}</span>
    </td>
  </tr>
</table>
```

### Divisor
```html
<tr>
  <td class="px-32">
    <div class="divider" style="margin: 32px 0;"></div>
  </td>
</tr>
```

### Divisor Colorido (Marca)
```html
<tr>
  <td>
    <div class="divider-thick"></div>
  </td>
</tr>
```

---

## ✅ Checklist de Qualidade

### Antes de Enviar
- [ ] Logo da empresa está correto
- [ ] Cores da marca aplicadas
- [ ] Todas as variáveis {{}} foram substituídas
- [ ] Links funcionando (CTAs, botões)
- [ ] Preview em desktop (600px)
- [ ] Preview em mobile (<600px)
- [ ] Testado em Gmail
- [ ] Testado em Outlook
- [ ] Sem erros de ortografia
- [ ] Footer com informações corretas

---

## 🧪 Testes Recomendados

### Clientes de Email
- ✅ Gmail (Web + App)
- ✅ Outlook (Desktop + Web)
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Thunderbird

### Dispositivos
- ✅ Desktop (1920x1080)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

### Navegadores
- ✅ Chrome
- ✅ Safari
- ✅ Firefox
- ✅ Edge

---

## 🎯 Exemplos de Uso

### Email de Boas-Vindas
```javascript
{
  "emailTitle": "Bem-vindo ao Konquest!",
  "emailSubtitle": "Estamos felizes em tê-lo conosco",
  "heroIcon": "👋",
  "mainMessage": "Sua jornada de aprendizado começa agora...",
  "ctaText": "Começar Agora",
  "ctaUrl": "https://konquest.empresa.com/onboarding"
}
```

### Email de Notificação
```javascript
{
  "emailTitle": "Nova missão disponível!",
  "emailSubtitle": "Você foi inscrito em uma nova missão",
  "heroIcon": "🎯",
  "mainMessage": "Uma nova missão está disponível...",
  "ctaText": "Ver Missão",
  "ctaUrl": "https://konquest.empresa.com/missions/123"
}
```

### Email de Relatório
```javascript
{
  "emailTitle": "Seu relatório está pronto!",
  "emailSubtitle": "Relatório mensal de atividades",
  "heroIcon": "📊",
  "mainMessage": "O relatório que você solicitou foi gerado...",
  "ctaText": "Baixar Relatório",
  "ctaUrl": "https://konquest.empresa.com/reports/download"
}
```

---

## 📞 Suporte

Dúvidas sobre o Design System?
- 📧 Email: design@keeps.com.br
- 💬 Slack: #design-system
- 📖 Documentação: `DESIGN_SYSTEM.md`
