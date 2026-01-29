#!/usr/bin/env python3
"""
Script para verificar e reportar diferenças entre os templates HTML
e o conteúdo esperado em miolos.md
"""

import os
import re
from pathlib import Path

# Mapeamento dos arquivos HTML para os números no miolos.md
TEMPLATE_MAPPING = {
    "01_analytics_new_report.html": 1,
    "02_konquest_enrolled_in_group_missions.html": 2,
    "03_konquest_invite.html": 3,
    "04_konquest_learning_trail_enrollment_expiring.html": 4,
    "05_konquest_live_enrollment_accepted.html": 5,
    "06_konquest_live_mission_starts_soon.html": 6,
    "07_konquest_mission_enrollment_expiring.html": 8,  # Nota: 7 no miolos é o 12 (expired)
    "08_konquest_mission_enrollment_restarted.html": 9,
    "09_konquest_mission_minimum_performance_updated.html": 11,
    "10_smartzap_invite.html": 27,
    "11_smartzap_caixa_user_already_enrolled_error.html": 25,
    "12_konquest_mission_enrollment_expired.html": 7,
    "13_smartzap_caixa_user_not_found_error.html": 26,
    "14_myaccount_resend_invite.html": 24,
    "15_konquest_onboarding.html": 16,
    "16_konquest_user_enrolled_in_a_course.html": 20,
    "17_konquest_user_enrolled_in_a_course_with_deadline.html": 19,
    "18_konquest_user_enrolled_in_a_live_mission.html": 21,
    "19_konquest_user_enrolled_in_a_presential_mission.html": 22,
    "20_konquest_user_enrolled_in_a_trail.html": 23,
    "21_konquest_presential_enrollment_accepted.html": 17,
    "22_konquest_presential_mission_starts_soon.html": 18,
    "23_konquest_new_missions.html": 15,
    "24_konquest_new_enrollment_to_review.html": 13,
    "25_konquest_new_mission_to_manage.html": 14,
    "26_konquest_mission_modified_by_contributor.html": 10,
    "27_konquest_mission_trail_disabled.html": 12,
}

# Conteúdos esperados do miolos.md (textos-chave para verificação)
EXPECTED_CONTENT = {
    1: {"header": None, "greeting": "Olá ,", "main": "Relatório Gerado com Sucesso"},
    2: {"header": "Rede Mais", "greeting": "Olá, VERÔNICA DAS GRAÇAS DE OLIVEIRA COUTINHO!", "main": "vinculado a um grupo"},
    3: {"header": None, "greeting": "Bem-vindo a Bordo, NELSON SEBASTIAN CABUYA ANAYA!", "main": "Mobiflix"},
    4: {"header": "Biolovers", "greeting": "Olá, JONAS DE SOUZA GUIMARAES!!", "main": "Trilha Comercial"},
    5: {"header": "BDMG Aprende", "greeting": "Olá, SIMONE PROVEZANO BISCOTO!", "main": "Evento Online"},
    6: {"header": "Keeps | Testes", "greeting": "Hello, Admin-tester Prod!", "main": "evento matriculas usuarios"},
    7: {"header": "Locação", "greeting": "Olá, Mônica Martins Norberto!", "main": "Curso de Captação de Imóveis QuintoAndar"},
    8: {"header": "Locação", "greeting": "Olá, Simone Cristina Batistela!", "main": "Trilha Inicial do Novo Corretor Associado"},
    9: {"header": "Biolovers", "greeting": "Olá, Luana Rodrigues!", "main": "Plannexo"},
    10: {"header": "Escola de Serviços", "greeting": "Olá, Prezado(a)!", "main": "curso foi modificado por um contribuidor"},
    11: {"header": "#ElsysLovers", "greeting": "Olá, Carlos Eduardo de Paula Machado!", "main": "Lidera - Inteligência Emocional"},
    12: {"header": None, "greeting": "Trilha com curso desabilitada", "main": "Educação Financeira"},
    13: {"header": "Educa+", "greeting": "Olá, Prezado(a)!", "main": "nova matrícula foi enviada para revisão"},
    14: {"header": "Biolovers", "greeting": "Olá, Administrador!", "main": "Integração de Dados na Plataforma Bionexo"},
    15: {"header": None, "greeting": None, "main": "Novos cursos foram adicionados"},
    16: {"header": None, "greeting": "Bem-vindo a Bordo, ADRIANI PERRELA BRAVO!", "main": "Casa Hoteis"},
    17: {"header": "Escola de Serviços", "greeting": "Olá, KATIA REGINA DE SOUZA!", "main": "evento presencial"},
    18: {"header": None, "greeting": None, "main": "Workshop: Redes Sociais & Marca Empregadora"},
    19: {"header": "Mobiflix", "greeting": "Hola, ANDRES LAUREANO DIAZ OSPINA!", "main": "YOU_HAVE_BEEN_ENROLLED_IN_A_COURSE_WITH_DEADLINE"},
    20: {"header": "Denso Academy", "greeting": "Olá, DANIEL GUENZA CHEMIN!", "main": "Emerging Leaders"},
    21: {"header": None, "greeting": "Olá, Nayara!", "main": "Evento 1"},
    22: {"header": None, "greeting": None, "main": "Conheça seu cliente_Integral_"},
    23: {"header": "Escola de Serviços", "greeting": "Olá, Francielen Deretti Miodutzki!", "main": "Áreas de Supply Chain"},
    24: {"header": None, "greeting": "Bem-vindo ao Smartzap, Isabelly Reducino!", "main": "Adimax"},
    25: {"header": "Keeps", "greeting": None, "main": "Gateway Caixa - Erro ao realizar matrícula"},
    26: {"header": "Keeps", "greeting": None, "main": "Gateway Caixa - Erro na consulta de usuário"},
    27: {"header": None, "greeting": "Bem-vindo ao Smartzap, Isabelly Reducino!", "main": "Adimax"},
}

def check_template(template_path, miolo_num):
    """Verifica se o template contém o conteúdo esperado"""
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    expected = EXPECTED_CONTENT.get(miolo_num, {})
    issues = []
    
    # Verificar header
    if expected.get("header"):
        if expected["header"] not in content:
            issues.append(f"  ❌ Header esperado '{expected['header']}' não encontrado")
        else:
            issues.append(f"  ✅ Header '{expected['header']}' encontrado")
    
    # Verificar greeting
    if expected.get("greeting"):
        if expected["greeting"] not in content:
            issues.append(f"  ❌ Saudação esperada '{expected['greeting']}' não encontrada")
        else:
            issues.append(f"  ✅ Saudação '{expected['greeting']}' encontrada")
    
    # Verificar conteúdo principal
    if expected.get("main"):
        if expected["main"] not in content:
            issues.append(f"  ❌ Conteúdo principal '{expected['main']}' não encontrado")
        else:
            issues.append(f"  ✅ Conteúdo principal '{expected['main']}' encontrado")
    
    return issues

def main():
    templates_dir = Path("public/templates-refatorados")
    
    print("=" * 80)
    print("VERIFICAÇÃO DE TEMPLATES - Comparação com miolos.md")
    print("=" * 80)
    print()
    
    all_ok = True
    
    for template_file, miolo_num in sorted(TEMPLATE_MAPPING.items()):
        template_path = templates_dir / template_file
        
        if not template_path.exists():
            print(f"⚠️  {template_file} (miolo #{miolo_num})")
            print(f"  ❌ Arquivo não encontrado!")
            print()
            all_ok = False
            continue
        
        issues = check_template(template_path, miolo_num)
        
        has_errors = any("❌" in issue for issue in issues)
        
        if has_errors:
            print(f"⚠️  {template_file} (miolo #{miolo_num})")
            all_ok = False
        else:
            print(f"✅ {template_file} (miolo #{miolo_num})")
        
        for issue in issues:
            print(issue)
        print()
    
    print("=" * 80)
    if all_ok:
        print("✅ TODOS OS TEMPLATES ESTÃO CORRETOS!")
    else:
        print("⚠️  ALGUNS TEMPLATES PRECISAM SER ATUALIZADOS")
    print("=" * 80)

if __name__ == "__main__":
    main()
