export default function writeHtmlToDom(
  theDomElementWeWantToTarget,
  htmlToInsertIntoTheDom
) {
  theDomElementWeWantToTarget.innerHTML += htmlToInsertIntoTheDom;
}
