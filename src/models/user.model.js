export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      rollNumber: DataTypes.STRING,
      batch: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "user",
      underscored: true,
    }
  );

  User.associate = (models) => {
    models.User.hasMany(models.SemPoint, {
      foreignKey: "userId",
      targetId: "id",
    });
  };
  return User;
};
