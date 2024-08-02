export default (sequelize, DataTypes) => {
    const Resource = sequelize.define(
      "Resource",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        resourceTitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        listOfResources: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: [],
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "resources",
        underscored: true,
        name: {
          singular: "resource",
          plural: "resources",
        },
      }
    );
  
    return Resource;
  };