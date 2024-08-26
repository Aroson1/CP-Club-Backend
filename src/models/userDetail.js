export default (sequelize, DataTypes) => {
    const UserDetail = sequelize.define(
      "UserDetail",
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
        linkedIn: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        github: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        codeforces: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        leetcode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        codechef: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "userDetails",
        underscored: true,
        name: {
          singular: "userDetail",
          plural: "userDetails",
        },
      }
    );
  
    UserDetail.associate = (models) => {
      models.UserDetail.belongsTo(models.User, {
        foreignKey: "userId",
        targetId: "id",
      });
    };
  
    return UserDetail;
  };
  