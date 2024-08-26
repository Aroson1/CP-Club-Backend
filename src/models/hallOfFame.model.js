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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "hallOfFame",
      underscored: true,
      name: {
        singular: "hallOfFame",
        plural: "hallOfFames",
      },
    }
  );

  return HallOfFame;
};
