const Discord = require("discord.js")

module.exports = {
  name: "gerenciar",
  description: "Gerencie o seu ticket",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        interaction.reply({
            content:`${interaction.user}`,
            embeds:[
                new Discord.EmbedBuilder()
                .setTitle("Gerencie o seu ticket!")
                .setDescription("🔐 - ticket: gerencie algumas coisas do ticket \n\n 🔔 - principais: Altere algumas coisas principais")
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
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
            ],
            ephemeral:true
        })
    }


  }
}