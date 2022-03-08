export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long`));
    }, s * 2000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(5)]);
    console.log(res);
    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error(`Bad request - check city name ${err}`);
  }
};

export const getWeekDay = seconds => {
  const secToMilisec = seconds * 1000;
  const date = new Date(secToMilisec).toUTCString().slice(0, 16).split(" ");
  return date[0].slice(0, -1);
};

export const countryFullName = new Intl.DisplayNames(["en"], {
  type: "region",
});

export const fullDayTime = data => {
  return new Date(data.dt * 1000 + data.timezone * 1000)
    .toUTCString()
    .slice(0, 22);
};
