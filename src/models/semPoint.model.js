export default (sequelize, DataTypes) => {
  const SemPoint = sequelize.define(
    "SemPoint",
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
        references: {
          model: "user",
          key: "id",
        },
      },
      sem: {
        type: DataTypes.ENUM,
        values: ["ODD", "EVEN"],
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "semPoint",
      underscored: true,
      name: {
        singular: "semPoint",
        plural: "semPoints",
      },
    }
  );

  SemPoint.associate = (models) => {
    models.SemPoint.belongsTo(models.User, {
      foreignKey: "userId",
      targetId: "id",
    });
  };
  return SemPoint;
};
