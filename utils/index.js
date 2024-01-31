export const getData = async () => {
  const res = await fetch("https://cataas.com/cat?json=true", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getImage = async ({
  id,
  text,
  filter,
  brightness,
  saturation,
  lightness,
  fontColor,
}) => {
  const color = fontColor.replace("#", "");

  let url = `https://cataas.com/cat${id && `/${id}`}`;

  if (text !== undefined && text !== null && text !== "") {
    url += `/says/${text}?fontColor=%23${color}`;
  } else {
    url += `?`;
  }

  if (filter !== undefined && filter !== "none") {
    url += `&filter=${filter}`;
  }

  if (filter === "custom") {
    url += "&";

    const customFilters = [];
    if (brightness !== undefined && brightness !== null) {
      customFilters.push(`brightness=${brightness}`);
    }
    if (saturation !== undefined && saturation !== null) {
      customFilters.push(`saturation=${saturation}`);
    }

    if (lightness !== undefined && lightness !== null) {
      customFilters.push(`lightness=${lightness}`);
    }
    if (customFilters.length > 0) {
      url += customFilters.join("&");
    }
  }

  const res = await fetch(url, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.url;
};
