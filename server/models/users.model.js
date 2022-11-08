import roles from '../utils/roles';

module.exports = function(sequelize, DataTypes){

    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false, 
            defaultValue: roles.USER
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg'
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		}
    },{
        tableName: 'Users',
        timestamps: false,
    });

    // User.hasOne(walletModel, {foreignKey: "user_model"})
    User.associate = (models) => {
        User.hasOne(models.wallet, {
          foreignKey: 'user_model',
        });
    };

    return User;
};