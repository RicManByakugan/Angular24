const buildSearch = (searchFields, searchTerm, additionalCriteria) => {
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
