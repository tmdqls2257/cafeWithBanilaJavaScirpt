function validAnagram(str1, str2) {
  if (str1.length !== str2.length) return false
  const frequency = {}
  for (let i = 0; i < str1.length; i++) {
    frequency[str1[i]] ? (frequency[str1[i]] += 1) : (frequency[str1[i]] = 1)
  }
  for (let i = 0; i < str2.length; i++) {
    str2[i] in frequency && frequency[str2[i]]--
  }
  for (let i in frequency) {
    if (frequency[i] !== 0) return false
  }
  return true
}
console.log(validAnagram('rat', 'car'))
