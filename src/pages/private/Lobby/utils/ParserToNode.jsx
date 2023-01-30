function getSize(hashtag) {
  let size = 5;
  hashtag.votes.forEach((e) => {
    size += 5;
    if (e.comment) {
      e.comment.forEach(() => {
        size += 0.5;
      });
    }
  });
  return size;
}

function SplitResult(content) {
  const result = [];
  const split = content.split(";");
  split.forEach((e) => {
    result.push({
      type: e.includes("http") ? "link" : "text" || "image",
      name: e,
      size: 1,
    });
  });

  const res = result.filter((e) => e.name !== "");
  return res;
}

function getContent(content) {
  if (content.includes(";")) {
    return SplitResult(content);
  }
  return [
    {
      type: content.includes("http") ? "link" : "text" || "image",
      name: content,
      size: 1,
    },
  ];
}

export default function ParserToNode(project) {
  const result = {
    root: true,
    type: "project",
    name: project.name,
    children:
      project.hashtags.map((hashtag) => {
        return {
          name: hashtag.hashtag_name,
          type: "hashtag",
          id: hashtag.id,
          hashtagAuthor: project.users.find((u) => u.id === hashtag.idUser).id,
          size: getSize(hashtag) * 10,
          children: hashtag.fileList
            .map((e) => {
              if (e.content !== "") {
                return {
                  name: e.type,
                  size: 5,
                  children: e.content !== "" && getContent(e.content), // e.content !== "" && getContent(e.content)
                  backup: [],
                };
              }
              return null;
            })
            .filter((e) => e !== null),
        };
      }) || [],
  };
  return result;
}
