# Mapeamento de Emojis para Material Symbols

## Conversão de Ícones nos Templates

| Emoji | Material Symbol | Nome do Ícone |
|-------|----------------|---------------|
| 📊 | `analytics` | Analytics/Relatório |
| 📧 | `mail` | Email |
| ✅ | `check_circle` | Sucesso/Confirmado |
| ⚠️ | `warning` | Aviso/Atenção |
| 🎓 | `school` | Educação/Curso |
| 🎯 | `target` | Objetivo/Meta |
| 📚 | `menu_book` | Trilha/Biblioteca |
| 🏆 | `trophy` | Conquista/Prêmio |
| 📝 | `assignment` | Tarefa/Atividade |
| 💼 | `work` | Trabalho/Profissional |
| 👥 | `groups` | Grupo/Pessoas |
| 🔔 | `notifications` | Notificação |
| ⏰ | `schedule` | Horário/Tempo |
| 🚀 | `rocket_launch` | Início/Lançamento |
| ❌ | `cancel` | Erro/Cancelado |
| 📍 | `location_on` | Localização |
| 📅 | `event` | Evento/Data |
| 🔄 | `sync` | Atualização/Sincronização |
| ⏳ | `hourglass_empty` | Expirando/Prazo |

## Implementação

```html
<!-- CDN do Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">

<!-- Uso do ícone -->
<span class="material-symbols-outlined" style="font-size: 40px; color: #007bff;">
  analytics
</span>
```

## CSS Necessário

```css
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'liga';
}
```
