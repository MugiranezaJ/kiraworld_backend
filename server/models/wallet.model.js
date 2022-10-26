
module.exports = function(sequelize, DataTypes){
    const Wallet = sequelize.define("Wallet", {
        wallet_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        // user: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
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
        tableName: 'Wallet',
        timestamps: false,
    });

    Wallet.associate = (model) =>{
		Wallet.belongsTo(model.users, {foreignKey: 'user_model', targetKey: 'id'});
	}

    return Wallet;
};