const Discord = require("discord.js")

module.exports = {
  name: "mylogs",
  description: "Veja suas logs", 
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction) => {
    const logs = require("../../json/logs.json")
    const userId = interaction.user.id;
    const userLogs = logs[userId];

    if (!userLogs || userLogs.length === 0) {
      interaction.reply({ content: `Você não possui registros de tickets.`, ephemeral: true });
      return;
    }

    let currentPage = 0;

    const maxPage = userLogs.length - 1;

    const embed = new Discord.EmbedBuilder()
      .setTitle("Registros de Tickets")
      .setDescription("Aqui estão seus registros de tickets:")
      .addFields({name:"Dono do Ticket", value: `${interaction.guild.members.cache.get(userLogs[currentPage].dono_ticket)}`, inline:true})
      .addFields({name:"Fechou o Ticket",value:  `${interaction.guild.members.cache.get(userLogs[currentPage].fechou_ticket)}`, inline:true})
      .addFields({name:"Assumido", value: `${interaction.guild.members.cache.get(userLogs[currentPage].assumido)?? `Ninguem Assumiu`}`, inline:true})
      .addFields({name:"Motivo", value: `\`${userLogs[currentPage].motivo}\``, inline:true})
      .addFields({name:"Código", value: `\`${userLogs[currentPage].codigo}\``, inline:true})
      .setFooter({text:`Página ${currentPage + 1} de ${userLogs.length}`});

    const row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("previousPage")
        .setLabel("Página Anterior")
        .setStyle(1),
      new Discord.ButtonBuilder()
        .setCustomId("nextPage")
        .setLabel("Próxima Página")
        .setStyle(1)
    );

    interaction.reply({ embeds: [embed], components: [row], ephemeral:true });

    const filter = (i) => i.customId === "previousPage" || i.customId === "nextPage";
    const collector = interaction.channel.createMessageComponentCollector({ filter});

    collector.on("collect", (i) => {
      if (i.customId === "previousPage" && currentPage > 0) {
        currentPage--;
      } else if (i.customId === "nextPage" && currentPage < maxPage) {
        currentPage++;
      }

      embed.fields = [];
      embed
      .setFields({name:"Dono do Ticket", value: `${interaction.guild.members.cache.get(userLogs[currentPage].dono_ticket)}`, inline:true} ,{name:"Fechou o Ticket",value:  `${interaction.guild.members.cache.get(userLogs[currentPage].fechou_ticket)}`, inline:true}, {name:"Assumido", value: `${interaction.guild.members.cache.get(userLogs[currentPage].assumido)?? `Ninguem Assumiu`}`, inline:true}, {name:"Motivo", value: `\`${userLogs[currentPage].motivo}\``, inline:true}, {name:"Código", value: `\`${userLogs[currentPage].codigo}\``, inline:true})
        .setFooter({text:`Página ${currentPage + 1} de ${userLogs.length}`});

      i.update({ embeds: [embed] });
    });

    

  }
}