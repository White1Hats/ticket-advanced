const Discord = require("discord.js")
const ticket = require("../../json/logs.json")
module.exports = {
  name: "ticket", 
  description: "Painel ticket",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const embed = new Discord.EmbedBuilder()
        .setColor("Default")
        .setDescription("Ticket")
        interaction.reply({
            embeds:[
                new Discord.EmbedBuilder()
                .setDescription("Configure o ticket antes de envia-lo")
                .setFooter({text:"caso você ja tenha feito alguma alteração anterior, clique em atualizar"}),
                embed
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("add-titule")
                    .setLabel("Adicionar Titulo")
                    .setStyle(1),
                    new Discord.ButtonBuilder()
                    .setCustomId("alterar-desc")
                    .setLabel("Adicionar Descrição")
                    .setStyle(1),
                    new Discord.ButtonBuilder()
                    .setCustomId("add-footer")
                    .setLabel("Adicionar Rodapé")
                    .setStyle(1),
                    new Discord.ButtonBuilder()
                    .setCustomId("add-image")
                    .setLabel("Adicionar banner")
                    .setStyle(1),
                    new Discord.ButtonBuilder()
                    .setCustomId("enviar_ticket")
                    .setLabel("Enviar Ticket")
                    .setStyle(1),
                ),
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("reiniciar-ticket")
                    .setLabel("Atualizar")
                    .setStyle(2),
                )
            ],
            ephemeral:true
        })



    }


  }
}