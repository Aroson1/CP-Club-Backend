export default (sequelize, DataTypes) => {
  const HallOfFame = sequelize.define(
    "HallOfFame",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "hall_of_fame",
      underscored: true,
      name: {
        singular: "hallOfFame",
        plural: "hallOfFame",
      },
    }
  );

  HallOfFame.associate = (models) => {
    HallOfFame.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      targetKey: "id",
    });
  };

  return HallOfFame;
};
