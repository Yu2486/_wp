def summary(data):
    for student in data:
        total = sum(student['scores'])
        avg = total / len(student['scores'])
        print(f"{student['name']}：總分 {total}，平均 {avg:.1f}")
