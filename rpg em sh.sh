#!/bin/bash

player_hp=30
player_attack=5
player_defense=10

enemies=(
    "Goblin,15,3,5"
    "Orc,25,4,8"
    "Dragão,50,6,10"
)

echo "Bem-vindo ao RPG feito no shell"
echo "Você enfrentará 3 batalhas, uma atrás da outra!"

rolar_dado() {
    local lados=$1
    echo $(( $(shuf -i 1-$lados -n 1) ))
}

for enemy_data in "${enemies[@]}"; do
    IFS=',' read -r enemy_name enemy_hp enemy_attack enemy_defense <<< "$enemy_data"
    echo -e "\nVocê encontrou um $enemy_name! Prepare-se para a batalha!"

    player_hp=30

    while [[ $player_hp -gt 0 && $enemy_hp -gt 0 ]]; do
        echo -e "\nSua Vida: $player_hp | Vida do $enemy_name: $enemy_hp"
        echo "1) Atacar"
        echo "2) Fugir"

        read -p "Escolha uma ação: " action

        case $action in
            1)
                rolagem=$(rolar_dado 20)
                echo "Você rolou um D20 e tirou: $rolagem"
                if [[ $rolagem -eq 20 ]]; then
                    dano_base=$(rolar_dado 8)
                    damage=$(( (dano_base + player_attack) * 2 ))
                    echo "Acerto crítico! Você causou $damage de dano!"
                elif [[ $rolagem -le $enemy_defense ]]; then
                    damage=0
                    echo "O ataque não conseguiu atravessar a defesa do $enemy_name!"
                else
                    dano_base=$(rolar_dado 8)
                    damage=$((dano_base + player_attack))
                    if [[ $damage -lt 1 ]]; then damage=1; fi
                    echo "Você atacou e causou $damage de dano!"
                fi
                enemy_hp=$((enemy_hp - damage))
                ;;
            2)
                echo "Você fugiu da batalha! Fim de jogo."
                exit 0
                ;;
            *)
                echo "Opção inválida!"
                continue
                ;;
        esac

        if [[ $enemy_hp -le 0 ]]; then
            echo "Você derrotou o $enemy_name! Prepare-se para a próxima batalha!"
            break
        fi

        echo "⚔️ O $enemy_name está atacando..."
        rolagem_inimigo=$(rolar_dado 20)
        echo "O inimigo rolou um D20 e tirou: $rolagem_inimigo"
        if [[ $rolagem_inimigo -eq 20 ]]; then
            dano_base=$(rolar_dado 8)
            damage=$(( (dano_base + enemy_attack) * 2 ))
            echo "Acerto crítico! O $enemy_name causou $damage de dano!"
        elif [[ $rolagem_inimigo -le $player_defense ]]; then
            damage=0
            echo "Você bloqueou o ataque do $enemy_name!"
        else
            dano_base=$(rolar_dado 8)
            damage=$((dano_base + enemy_attack))
            if [[ $damage -lt 1 ]]; then damage=1; fi
            echo "O $enemy_name atacou e causou $damage de dano!"
        fi

        player_hp=$((player_hp - damage))

        if [[ $player_hp -le 0 ]]; then
            echo "Você foi derrotado..."
            exit 0
        fi
    done
done

echo "Parabéns! Você venceu o Dragão... mas a princesa está em outro castelo..."