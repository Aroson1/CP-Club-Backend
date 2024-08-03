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
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      rollNumber: DataTypes.STRING,
      batch: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      googleId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      displayName: DataTypes.STRING,
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
