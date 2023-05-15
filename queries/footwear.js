const db = require("../db/dbConfig.js");

const getAllFootwear = async () => {
    try {
        const allFootwear = await db.any("SELECT * FROM footwears");
        return allFootwear;
    } catch(error) {
        return {error: error}
    }
};

const getOneFootwear = async (id) => {
    try{
        const footwear = await db.one(`SELECT * FROM footwears WHERE id=${id}`);
        return footwear;

    }catch (error) {
        return {error: error};
    }
};

const createFootwear = async (footwear) => {
    try {
        const newFootwear = await db.one(
            `INSERT INTO
            footwears(name, cost, category, url, image, is_trending)
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [footwear.name, footwear.cost, footwear.category, footwear.url, footwear.image, footwear.is_trending]
        );
        return newFootwear;
    } catch (error) {
        return { error: error};
    }
};

  const updateFootwear = async (id, footwear) => {
    try {
      const updatedFootwear = await db.one(
        `UPDATE footwears SET name=$1, cost=$2, category=$3, url=$4, image=$5, is_trending=$6 WHERE id=$7 RETURNING *`,
        [footwear.name, footwear.cost, footwear.category, footwear.url, footwear.image, footwear.is_trending, id]
      );
      return updatedFootwear;
    } catch (error) {
      return { error: error };
    }
  };

  const deleteFootwear = async (id) => {
    try {
      const deletedFootwear = await db.one(
        "DELETE FROM footwears WHERE id=$1 RETURNING *",
        id
      );
      return deletedFootwear;
    } catch (e) {
      return e;
    }
  };

module.exports = {
    getAllFootwear,
    getOneFootwear,
    createFootwear,
    updateFootwear,
    deleteFootwear}