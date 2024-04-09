import { beforeEach, describe, expect, it,vi } from "vitest";
import { cleanup,screen,render, fireEvent} from "@testing-library/react";
import Form from "./Form";

describe('From', () => {
    const handleSubmit = vi.fn()

    beforeEach(() => {
        cleanup();
    })

    //it('loads and display', () => {
        // const i = 2;  //fuction
        // // expect(i).toBe(1); //การแปลงตัวแปรให้เป็นตัวนั้น ๆ check correctly
        // //ขอเป็นตัวอะไรก็ได้ที่ไม่ใช่ 1
        // expect(i).not.toBe(1);
   // });

    it('loads and display', () => {
        //Arrange
        render(<Form onFormClicked={handleSubmit} />);
        //Act
        const button = screen.getByRole('button', { name: 'submit' })
        // //Assert
        expect(button).toBeDefined()
        // expect(handleSubmit).toBeCalled() //tobecall ถูกเรียกเฉยๆ ถ้ามี with มันจะต้องหาค่าที่ถูกพ้นออกมาจากการ return
    })

    it('should show counter number if count button is clicked', () => {
        //Arrange
        render(<Form onFormClicked={handleSubmit} />);
        //Act
        const button = screen.getByRole('button', { name: 'submit' })
        fireEvent.click(button);
        const textbox = screen.getByRole('textbox', { name: 'counter' })
        fireEvent.change(textbox, { target: { value : '1234'}}) //กรณีหน้า login หรือ ฟอร์ม CRUD ที่มีการกรอกข้อมูล
        // //Assert
        expect(textbox).toBeDefined()
        expect(textbox.value).toBe('1234')

        //tobecall ถูกเรียกเฉยๆ ถ้ามี with มันจะต้องหาค่าที่ถูกพ้นออกมาจากการ return
        //password ไม่ใช่ textbox ต้อง getByLableText
        //open pwd can text and password when use eye
    })

    // it('should show password when open the eye', () => {
    //     render(<Form onFormClicked={handleSubmit} />);
    // })
});
