def counting_sort(arr):
    if not arr:
        return arr

    minimum = min(arr)
    maximum = max(arr)

    count = [0] * (maximum - minimum + 1)

    for num in arr:
        count[num - minimum] += 1

    result = []

    for i, frequency in enumerate(count):
        result.extend([i + minimum] * frequency)

    return result


print(counting_sort([4, -2, 2, 4, 8, 3, 1]))