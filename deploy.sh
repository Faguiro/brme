#!/bin/bash

# Função para verificar o status de saída de um comando
check_exit_status() {
    if [ $? -ne 0 ]; then
        echo "Erro: O comando falhou."
        exit 1
    fi
}

# Executar comandos com verificação de erros
vtex release patch stable
check_exit_status

vtex use bridge --production
check_exit_status

vtex install
check_exit_status

vtex ls
check_exit_status

vtex deploy --force
check_exit_status

vtex promote
check_exit_status

echo "🚀Deploy feito com sucesso!🚀"