
module.exports = function(sequelize, DataTypes){
    const Transactions = sequelize.define("Transactions", {
        transaction_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        fee: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        status: {
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
        tableName: 'Transactions',
        timestamps: false,
    });

    Transactions.associate = (model) =>{
		Transactions.belongsTo(model.users, {foreignKey: 'user_model', targetKey: 'id'});
	}

    return Transactions;
};