
const config = require("../config.json")
const ticket = require("../json/config.ticket.json")
const { ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const fs = require("fs")

module.exports = {
    name: 'gerenciar',
    async execute(interaction, message, client) {
        if(interaction.isStringSelectMenu() && interaction.customId === "gerenciamento_ticket"){
            const options = interaction.values[0]
            const cargo = interaction.guild.roles.cache.get(ticket.config_principais.cargo_staff)
            const canal_logs = interaction.guild.channels.cache.get(ticket.config_principais.channel_logs)
            const canal_avaliação = interaction.guild.channels.cache.get(ticket.config_principais.channel_avaliation)
            const categoria_ticket = interaction.guild.channels.cache.get(ticket.config_principais.category_ticket)
            if(options === "principal_selectmeu"){
                interaction.update({
                    embeds:[
                        new EmbedBuilder()
                        .setTitle("Altere as principais configurações!")
                        .setDescription(`📕 ** | Cargo Staff:** ${cargo ?? `\`Não Definido\``} \n 🛠 **| Canal Logs:**${canal_logs ?? `\`Não Definido\` `}\n 🛠 **| Canal Avaliação:**${canal_avaliação ?? `\`Não Definido\` `}  \n 🛠 **| Categoria Ticket:**${categoria_ticket ?? `\`Não Definido\` `}`)
                    ],
                    components:[
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setPlaceholder("Altere algumas principais opções")
                            .setCustomId("principal_1")
                            .addOptions(
                                {
                                    label:"Cargo Staff",
                                    description:"Altere o cargo Staff",
                                    value:"cargo_staff_alterar"
                                },
                                {
                                    label:"Canal Logs",
                                    description:"Altere Canal Logs",
                                    value:"channel_logs_alterar"
                                },
                                {
                                    label:"Canal avaliação",
                                    description:"Altere avaliação",
                                    value:"channel_avaliation_alterar"
                                },
                                {
                                    label:"Categoria ticket",
                                    description:"Altere id do ticket",
                                    value:"ticket_id_category"
                                },
                                {
                                    label:"Voltar",
                                    description:"Volte para as opções",
                                    value:"voltar_select"
                                },
                            )
                        )
                    ]
                })
            }
            if(options === "ticket_selectmenu"){
                interaction.update({
                    embeds:[
                        new EmbedBuilder()
                        .setTitle("Altere algumas coisas extras no ticket")
                        .setDescription(`Modificações Visuais do ticket(após abrir ticket) \n\nMencionar quem abriu ticket: {user} \nIxibir Codigo do Ticket: {codigo} \n Mostrar quem Assumiu Ticket: {assumido} \n Mostrar Motivo do ticket: {motivo}`)
                    ],
                    components:[
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId("ticket_secundario")
                            .setPlaceholder("Altere algumas das opções abaixo")
                            .addOptions(
                                {
                                    label:"Alterar Painel Ticket",
                                    value:"alterar_painel"
                                },
                                {
                                    label:"Alterar thumbnail",
                                    value:"alterar_thumbnail"
                                },
                                {
                                    label:"Resetar Opções",
                                    value:"resetar"
                                },
                                {
                                    label:"Voltar",
                                    value:"voltar_select"
                                }
                            )
                        )
                    ]
                })
            }
        }

        if(interaction.isStringSelectMenu() && interaction.customId === "ticket_secundario"){
            const options = interaction.values[0]

            if( options === "alterar_painel"){
                const modal = new ModalBuilder().setCustomId("alterar_painel").setTitle("Alterar Painel")

                const text = new TextInputBuilder()
                .setCustomId("text_modal")
                .setLabel("Edite a mensagem painel")
                .setPlaceholder("Digite aqui ✏")
                .setStyle(2)
                .setValue(`${ticket.config_dentro.texto}`)
    
                modal.addComponents(new ActionRowBuilder().addComponents(text))
                
                return interaction.showModal(modal)
            }

            if( options === "alterar_thumbnail"){
                const modal = new ModalBuilder()
                .setCustomId("modal_alterar_thumb")
                .setTitle("Alterar thumbnail")

                const painel = new TextInputBuilder()
                .setCustomId("thumbnail_alterar")
                .setLabel("Qual será a nova imagem?")
                .setRequired(true)
                .setStyle(1)
                .setPlaceholder("Coloque alguma url!")

                modal.addComponents(new ActionRowBuilder().addComponents(painel))
                
                return interaction.showModal(modal)
            }

            if( options === "resetar"){
                ticket.config_dentro.texto = "👥 **| Usuario:** {user} \n\n💻 **| Motivo do Ticket:** {motivo}  \n\n 🔐** | Codigo Ticket: {codigo} ** \n\n🔰 **| Informações:** __*Seja Bem Vindo para seu Ticket! Espere até que um **STAFF** lhe atenda, Evite de Marcar varias vezes para evitar punições!*__ \n\n 🧰 **| Ticket Assumido: **{assumido}"
                interaction.reply({
                    content:"Resetado com sucesso!",
                    ephemeral:true
                })

                fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));
            }

            


            if(options === "voltar_select") {
                interaction.update({
                    embeds:[
                        new EmbedBuilder()
                        .setTitle("Gerencie o seu ticket!")
                        .setDescription("🔐 - ticket: gerencie algumas coisas do ticket \n\n 🔔 - principais: Altere algumas coisas principais")
                    ],
                    components:[
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId("gerenciamento_ticket")
                            .setPlaceholder("Modifique algo selecionando algumas das opções")
                            .addOptions(
                                {
                                    label:"Ticket",
                                    value:"ticket_selectmenu"
                                },
                                {
                                    label:"principais",
                                    value:"principal_selectmeu"
                                }
                            )
                        )
                    ]
                })
            }
        }


        if(interaction.isStringSelectMenu() && interaction.customId === "principal_1"){
            const options = interaction.values[0]
            if(options === "cargo_staff_alterar") {
                const modal = new ModalBuilder().setCustomId("modal_cargo").setTitle("Gerenciamento de Cargo")

                const id = new TextInputBuilder()
                .setCustomId("id_cargo")
                .setLabel("Coloque o id de um cargo")
                .setPlaceholder("Digite aqui ✏")
                .setStyle(1)
    
                modal.addComponents(new ActionRowBuilder().addComponents(id))
                
                return interaction.showModal(modal)
                
            }
            if(options === "channel_logs_alterar") {
                const modal = new ModalBuilder()
                .setCustomId("modal_logs_alterar")
                .setTitle("Altere o canal de logs")

                const id = new TextInputBuilder()
                .setCustomId("id_canal_logs")
                .setLabel("Coloque o id do canal de logs")
                .setStyle(1)
                .setValue(`${interaction.channel.id}`)

                modal.addComponents(new ActionRowBuilder().addComponents(id))
                
                return interaction.showModal(modal)
            }
            if(options === "ticket_id_category") {
                const modal = new ModalBuilder()
                .setCustomId("modal_category_alterar")
                .setTitle("Altere a categoria")

                const id = new TextInputBuilder()
                .setCustomId("id_category")
                .setLabel("Alterar a categoria de ticket")
                .setStyle(1)
                .setPlaceholder("coloque um id")

                modal.addComponents(new ActionRowBuilder().addComponents(id))
                
                return interaction.showModal(modal)
            }
            if(options === "channel_avaliation_alterar") {
                const modal = new ModalBuilder()
                .setCustomId("modal_avaliation_alterar")
                .setTitle("Altere o canal de avaliação")

                const id = new TextInputBuilder()
                .setCustomId("id_avaliation")
                .setLabel("Coloque o id de um canal")
                .setStyle(1)
                .setPlaceholder("coloque um id")

                modal.addComponents(new ActionRowBuilder().addComponents(id))
                
                return interaction.showModal(modal)
            }
            if(options === "voltar_select") {
                interaction.update({
                    embeds:[
                        new EmbedBuilder()
                        .setTitle("Gerencie o seu ticket!")
                        .setDescription("🔐 - ticket: gerencie algumas coisas do ticket \n\n 🔔 - principais: Altere algumas coisas principais")
                    ],
                    components:[
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId("gerenciamento_ticket")
                            .setPlaceholder("Modifique algo selecionando algumas das opções")
                            .addOptions(
                                {
                                    label:"Ticket",
                                    value:"ticket_selectmenu"
                                },
                                {
                                    label:"principais",
                                    value:"principal_selectmeu"
                                }
                            )
                        )
                    ]
                })
            }
        }

        if(interaction.isModalSubmit() && interaction.customId === "modal_avaliation_alterar"){
            const thumb = interaction.fields.getTextInputValue("id_avaliation");
            const canal = interaction.guild.channels.cache.get(thumb)

            if(!canal) {
                interaction.reply({ content:" este canal não Existe!", ephemeral:true})
                return;
            }
            ticket.config_principais.channel_avaliation =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`Canal de avaliação alterado com sucesso!`,
                ephemeral:true
            })
        }



        if(interaction.isModalSubmit() && interaction.customId === "modal_category_alterar"){
            const thumb = interaction.fields.getTextInputValue("id_category");
            const canal = interaction.guild.channels.cache.get(thumb)

            if(!canal) {
                interaction.reply({ content:" Esta categoria não Existe!", ephemeral:true})
                return;
            }
            ticket.config_principais.category_ticket =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`Categoria ticket alterado com sucesso!`,
                ephemeral:true
            })
        }

        if(interaction.isModalSubmit() && interaction.customId === "modal_cargo"){
            const thumb = interaction.fields.getTextInputValue("id_cargo");
            const canal = interaction.guild.roles.cache.get(thumb)

            if(!canal) {
                interaction.reply({ content:" Este Cargo não Existe!", ephemeral:true})
                return;
            }
            ticket.config_principais.cargo_staff =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`Cargo Staff alterado com sucesso!`,
                ephemeral:true
            })
        }



        if(interaction.isModalSubmit() && interaction.customId === "modal_logs_alterar"){
            const thumb = interaction.fields.getTextInputValue("id_canal_logs");
            const canal = interaction.guild.channels.cache.get(thumb)

            if(!canal) {
                interaction.reply({ content:" Este canal não Existe!", ephemeral:true})
                return;
            }
            ticket.config_principais.channel_logs =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`canal logs alterado com sucesso!`,
                ephemeral:true
            })
        }




        if(interaction.isModalSubmit() && interaction.customId === "alterar_painel"){
            const thumb = interaction.fields.getTextInputValue("text_modal");
            ticket.config_dentro.texto =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`Painel alterado com sucesso!`,
                ephemeral:true
            })
        }


        if(interaction.isModalSubmit() && interaction.customId === "modal_alterar_thumb"){
            const thumb = interaction.fields.getTextInputValue("thumbnail_alterar");
            ticket.config_dentro.thumbnail =  thumb

            fs.writeFileSync('json/config.ticket.json', JSON.stringify(ticket));

            interaction.reply({
                content:`Thumbnail alterado com sucesso!`,
                ephemeral:true
            })
        }
    }}