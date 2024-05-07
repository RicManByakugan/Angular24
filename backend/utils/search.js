const buildSearch = (searchFields, searchTerm, additionalCriteria) => {
  console.log(searchTerm);
  if (searchTerm) {
    const orConditions = searchFields.map((field) => ({
      [field]: { $regex: `${searchTerm}`, $options: "i" },
    }));
    return {
      $or: orConditions,
      ...additionalCriteria,
    };
  } else {
    return additionalCriteria;
  }
};

module.exports = { buildSearch };
