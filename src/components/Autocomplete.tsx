import React from "react";
import useAutoComplete from "./useAutocomplete";

const getSplitText = (
  suggestions: any,
  index: number,
  selectedValue: string
) => ({
  startString: suggestions[index].label.substr(
    0,
    suggestions[index].label.toLowerCase().indexOf(selectedValue.toLowerCase())
  ),
  endString: suggestions[index].label.substr(
    suggestions[index].label
      .toLowerCase()
      .indexOf(selectedValue.toLowerCase()) + selectedValue.length
  ),
  highlightedText: suggestions[index].label.substr(
    suggestions[index].label.toLowerCase().indexOf(selectedValue.toLowerCase()),
    selectedValue.length
  ),
});

const Autocomplete = () => {
  const { bindInput, bindOptions, bindOption, isLoading, suggestions } =
    useAutoComplete(async (search: string) => {
      try {
        const res = await fetch(
          `http://universities.hipolabs.com/search?name=${search}`
        );
        const data = await res.json();
        return data.map((d: any, index: number) => ({
          value: index,
          label: d.name,
        }));
      } catch (e) {
        return [];
      }
    });

  return (
    <div className="autocompleteContainer">
      <div className="autocompleteInputContainer">
        <input
          placeholder="Search"
          className="autocompleteInput"
          {...bindInput}
        />
        {isLoading && <div className="autocompleteSpinner"></div>}
      </div>
      <ul {...bindOptions} className="autocompleteList">
        {suggestions.map((_, index) => {
          const { startString, highlightedText, endString } = getSplitText(
            suggestions,
            index,
            bindInput.value
          );
          return (
            <li className="autocompleteItem" key={index} {...bindOption}>
              <div className="autocompleteItemContainer">
                {startString}
                <span className="autocompleteInputMatching">
                  {highlightedText}
                </span>
                {endString}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Autocomplete;
